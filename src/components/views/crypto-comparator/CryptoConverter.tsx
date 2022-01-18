import React, {useState} from "react";

interface CryptoConverterProps {
    exchangesUpdates: {
        rate: number | undefined;
        exchangeName: string;
    }[]
}

export default function CryptoConverter (props: CryptoConverterProps)  {
    const [value, setValue] = useState('')

    const {
        exchangesUpdates
    } = props

    const getConversion = (rate: number | undefined, value: string | number) => {
        let valueNumber = Number(value)

        if (rate !== undefined && !isNaN(valueNumber)) {
            return (valueNumber / rate).toFixed(2)
        }


        return 0
    }


    return (
        <div>
            <input
                type={'number'}
                data-testid={'crypto-converter-input'}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {
                exchangesUpdates.map(eu => {
                    return (
                        <div key={eu.exchangeName}>
                            <span>{ eu.exchangeName }</span>
                            <p>
                                {
                                    getConversion(eu.rate, value)
                                }
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )

}