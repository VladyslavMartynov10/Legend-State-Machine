type ReactComponent<Props = {}> = React.ComponentType<Props>;

export const setDefaultProps = <T extends ReactComponent>(
  Component: T,
  additionalProps: React.ComponentProps<T>,
) => {
  Component.defaultProps = {
    ...(Component.defaultProps || {}),
    ...additionalProps,
  };
};

export const touchableConfig = {
  delayPressIn: 0,
  delayPressOut: 0,
  activeOpacity: 0.5,
};
