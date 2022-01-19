import React, {useEffect, useState} from 'react'

const COUNTDOWN = 15

export default function CryptoTimer () {
    const [count, setCount] = useState(COUNTDOWN);

    useEffect(
        () => {
            if (count <= 0) {
                setCount(COUNTDOWN)
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
