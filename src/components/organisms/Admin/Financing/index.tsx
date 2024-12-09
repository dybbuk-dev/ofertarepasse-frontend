import React, { useEffect, useState } from 'react'
import Wallet from 'assets/images/wallet.png'
import api from 'services/api'

const Financing = () => {
    const [fee, setFee] = useState<number>(0)
    useEffect(() => {
        api.get('/api/v1/fee').then((res: any) => {
            setFee(res.data.fee)
        })
    }, [])
    const handleSubmit = () => {
        api.patch('/api/v1/fee', { fee }).then((res: any) => {
            setFee(res.data.fee)
        })
    }
    return (
        <div className='relative h-[calc(100vh-150px)] w-full'>
            <div className='flex flex-col items-center gap-y-3 xs:items-start'>
                <div>Definir taxa padrão em R$.</div>
                <div className='flex items-center gap-x-3'>
                    <input
                        className='m-0 appearance-none px-3 py-2 outline-none'
                        value={fee}
                        size={1}
                        onChange={(ev) => setFee(ev.target.valueAsNumber)}
                        type='number'
                    />
                    R$
                </div>
                <button
                    className='rounded-lg bg-primary px-3 py-2 text-lg text-white'
                    onClick={handleSubmit}
                >
                    Definir taxa
                </button>
            </div>
            <img
                className='absolute bottom-0 right-0 h-[250px] w-[300px] opacity-30'
                src={Wallet}
            />
        </div>
    )
}

export default Financing
