/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ComponentType, LazyExoticComponent } from "react";
import { lazy, Suspense } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@realms-world/ui";

import { useHideModal, useModal } from "../providers/ModalProvider";

export interface Component {
  component: LazyExoticComponent<ComponentType<any>>;
  props: any;
}
export const ModalWrapper = () => {
  const { show, withHeader, header, body, footer } = useModal();

  const hideModal = useHideModal();

  const getComponents = (components: string[]) => {
    return components
      ? components.map((c: any) => ({
          component: lazy(() => import(`../_components/modal/${c.path}`)),
          props: c.props,
        }))
      : [];
  };

  const renderLoading = () => {
    return <div className={"center h-full w-full"}>Loading</div>;
  };

  const renderComponents = (
    components: Component[],
    fallbackComponent?: any,
  ) => {
    return components.length > 0
      ? components.map((c, i) => <c.component key={i} {...c.props} />)
      : fallbackComponent;
  };

  const headerComponents = getComponents(header.components);
  const bodyComponents = getComponents(body.components);
  const footerComponents = getComponents(footer.components);

  return (
    <Dialog open={show} onOpenChange={hideModal}>
      <DialogContent className="w-full">
        {withHeader && (
          <DialogHeader className="items-center">
            <Suspense fallback={renderLoading()}>
              {renderComponents(headerComponents)}
            </Suspense>
            {header.title && <DialogTitle>{header.title}</DialogTitle>}
          </DialogHeader>
        )}
        <Suspense fallback={renderLoading()}>
          {renderComponents(bodyComponents, <div>{body.text}</div>)}
        </Suspense>
        {footer.withButtons && (
          <DialogFooter>
            <Suspense fallback={renderLoading()}>
              {renderComponents(footerComponents)}
            </Suspense>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
