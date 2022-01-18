import React, {useState} from "react";
import './CryptoConverter.css'


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
            return (valueNumber / rate).toFixed(6)
        }


        return 0
    }


    return (
        <div className={'crypto-converter d-flex pl-4 pr-4'}>
            <div className={'crypto-converter_input d-flex align-center'}>
                <label htmlFor={'crypto-converter-input'} className={'mr-2'}>
                    MXN
                </label>
                <div>
                    <input
                        type={'number'}
                        data-testid={'crypto-converter-input'}
                        id={'crypto-converter-input'}
                        required
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <p className={'font-small'}>
                        hint: try with a big number. EX: 4,000
                    </p>
                </div>
            </div>
            {
                exchangesUpdates.map(eu => {
                    return (
                        <div key={eu.exchangeName} className={'ml-5'}>
                            <span>{ eu.exchangeName }</span>
                            <p className={'font-bold'}>
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