"use client";
import { Suspense, lazy } from "react";
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

export const BridgeModalWrapper = () => {
  const { show, withHeader, header, body, footer } = useBridgeModal();

  const getComponents = (components: any) => {
    return components
      ? components.map((c) => ({
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
      <div className={"center"}>
        <Loading />
      </div>
    );
  };
  const renderComponents = (components: any, fallbackComponent?: any) => {
    return components.length > 0
      ? components.map((c, i) => <c.component key={i} {...c.props} />)
      : fallbackComponent;
  };

  const headerComponents = header.components.map((component) => {
    if (component.path == "ui/stepper") {
      return { component: Views["stepper"], props: component.props };
    }
    if (component.path == "modal/ProgressModal/ProgressModalHeader") {
      return {
        component: Views["progressModalHeader"],
        props: component.props,
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
