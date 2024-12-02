import { type PropsWithChildren } from 'react';
import { IndicatorDot } from './IndicatorDot';

interface CardProps {
    title: string,
    indicatorDotHidden: boolean,
    indicatorDotDanger: boolean,
}

export const Card = ({
    children = null,
    title = '',
    indicatorDotHidden = true,
    indicatorDotDanger = false,
}: PropsWithChildren<CardProps>) => {
    return (
        <div className="border border-solid rounded border-neutral-500">
            <div className="flex justify-center items-center mb-4 mt-2">
                <h3 className="text-lg text-center border-b border-slate-500">{title}</h3>
                <IndicatorDot
                    className="ml-2 mt-1"
                    danger={indicatorDotDanger}
                    hidden={indicatorDotHidden}
                />
            </div>
            <div className="m-4 flex justify-center">
                {children}
            </div>
        </div>
    );
};
