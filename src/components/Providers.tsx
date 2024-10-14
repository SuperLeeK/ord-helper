import React from "react";

interface Props {
  debug?: boolean | { network?: boolean; console?: boolean };
}

interface ProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const $Providers = (props: ProviderProps) => <></>;

$Providers.$$NAME = "__@@ALEX_PROVIDE@@__";

type ElementOf = React.ReactNode & { type?: { $$NAME?: string } };

const Pack = ({ children }: React.PropsWithChildren<Props>) => {
  const oChildren = React.Children.toArray(children) as ElementOf[];

  const providerGroup = oChildren?.find((el: ElementOf) => {
    return el.type?.$$NAME === $Providers?.$$NAME;
  }) as React.ReactElement;

  const bodies: React.ReactNode[] = oChildren?.filter((el: ElementOf) => {
    return el.type?.$$NAME !== $Providers?.$$NAME;
  });

  const providers = providerGroup
    ? React.Children.toArray(providerGroup.props.children)
    : [];

  const exports: React.ReactNode = providers?.reduce?.(
    (element: React.ReactNode, provider: React.ReactNode, index: number) => {
      let last = element as React.ReactElement;

      while (last.props.children?.length > 0) {
        last = last.props.children?.[0];
      }

      last.props.children.push(
        React.createElement(
          (provider as React.ReactElement).type,

          { key: `${index}`, ...(provider as React.ReactElement).props },

          []
        )
      );

      return element;
    },

    React.createElement(React.Fragment, null, [])
  );

  let output;

  if (exports) {
    let last: React.ReactElement = exports as React.ReactElement;

    while (last.props.children?.length > 0) {
      last = last.props.children?.[0];
    }

    last.props.children.push(...bodies);

    output = exports;
  } else {
    output = bodies;
  }

  return <div>{output}</div>;
};

Pack.defaultProps = {
  debug: false,

  style: { flex: 1 },
};

export const Providers = $Providers;

export const ProvidersPack = React.memo(Pack) as React.MemoExoticComponent<
  typeof Pack
> & {
  Providers: typeof $Providers;
};

ProvidersPack.Providers = $Providers;
