"use client";
import { ComponentType, LazyExoticComponent, Suspense, lazy } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useBridgeModal } from "../providers/BridgeModalProvider";
import Loading from "../loading";
import dynamic from "next/dynamic";

export type Component = {
  component: LazyExoticComponent<ComponentType<any>>;
  props: any;
};
export const BridgeModalWrapper = () => {
  const { show, withHeader, header, body, footer } = useBridgeModal();

  const getComponents = (components: string[]) => {
    return components
      ? components.map((c: any) => ({
          component: lazy(() => import(`../components/${c.path}`)),
          props: c.props,
        }))
      : [];
  };

  const Views = {
    stepper: dynamic(() => import("../components/ui/stepper")),
    proressModalBody: dynamic(
      () => import("../components/modal/ProgressModal/ProgressModalBody")
    ),
    progressModalHeader: dynamic(
      () => import("../components/modal/ProgressModal/ProgressModalHeader")
    ),
  };

  const renderLoading = () => {
    return (
      <div className={"center w-full h-full"}>
        <Loading />
      </div>
    );
  };
  const renderComponents = (
    components: Component[],
    fallbackComponent?: any
  ) => {
    return components.length > 0
      ? components.map((c, i) => <c.component key={i} {...c.props} />)
      : fallbackComponent;
  };
  // Temporary fix for next/react dynamic imports https://github.com/vercel/next.js/issues/49382
  const headerComponents: any = header.components.map((component: any) => {
    if (component.path == "ui/stepper") {
      return { component: Views["stepper"], props: component.props };
    }
    if (component.path == "modal/ProgressModal/ProgressModalHeader") {
      return {
        component: Views["progressModalHeader"],
        props: component.props,
      };
    } else {
      return {
        component: Views["progressModalHeader"],
      };
    }
  });
  const bodyComponents = getComponents(body.components);
  const footerComponents = getComponents(footer.components);

  return (
    <Dialog open={show}>
      <DialogContent className="w-full">
        {withHeader && (
          <DialogHeader>
            <Suspense fallback={renderLoading()}>
              {renderComponents(headerComponents)}
            </Suspense>
            {header.title && <DialogTitle>{header.title}</DialogTitle>}
          </DialogHeader>
        )}
        <Suspense fallback={renderLoading()}>
          {renderComponents(bodyComponents, <div>{body.text}</div>)}
        </Suspense>
      </DialogContent>
      {footer.withButtons && (
        <DialogFooter>
          <Suspense fallback={renderLoading()}>
            {renderComponents(footerComponents)}
          </Suspense>
        </DialogFooter>
      )}
    </Dialog>
  );
};
