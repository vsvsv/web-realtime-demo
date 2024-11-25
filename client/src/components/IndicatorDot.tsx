import cn from 'classnames';

interface IndicatorDotProps {
    className: string,
    hidden: boolean,
    danger: boolean,
};

export const IndicatorDot = ({
    className,
    hidden = false,
    danger = false,
}: IndicatorDotProps) => {
    const dotClasses = cn({
        'signal-dot': true,
        'signal-dot-hidden': hidden,
        'signal-dot-error': danger,
        ...(className ? { [className]: true } : {}),
    });
    return (
        <span className={dotClasses} />
    );
};
