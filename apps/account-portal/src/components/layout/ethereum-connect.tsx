// AppKit's balance slot renders a spinner until the native balance resolves,
// which can spin indefinitely; the portal doesn't use the ETH balance here.
export const EthereumConnect = ({ label }: { label?: string }) => {
  return <appkit-button balance="hide" label={label} />;
};
