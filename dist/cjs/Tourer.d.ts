import { FC, PropsWithChildren, ReactNode } from "react";
export interface ITourerProps {
    render: () => ReactNode;
}
export declare const Tourer: FC<PropsWithChildren<ITourerProps>>;
