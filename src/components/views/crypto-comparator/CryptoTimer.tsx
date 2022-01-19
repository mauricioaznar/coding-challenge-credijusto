import React, {useEffect, useState} from 'react'


interface CryptoTimerProps {
    countdown: number;
    callback: () => void;
}

export default function CryptoTimer (props: CryptoTimerProps) {
    const { countdown, callback } = props

    const [count, setCount] = useState(countdown);

    useEffect(
        () => {
            if (count <= 0) {
                callback()
                setCount(countdown)
            }
            const timeout = setTimeout(() => {
                setCount(count - 1)
            }, 1000)
            return () => clearTimeout(timeout);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [count])

    return <div>
        <h4>
            Crypto timer
        </h4>
        <div>
            Next update: {count}s
        </div>
    </div>
}
