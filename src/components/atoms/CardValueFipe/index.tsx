import formatMoney from 'utils/formatMoney'

const CardValueFipe = ({ fipe }: { fipe: number }) => (
    <div className='grid grid-cols-none grid-rows-2 gap-8 border-y border-gray-700 bg-[#efefef] px-3 py-2 xs:grid-cols-2 xs:grid-rows-none xs:px-6 xs:py-3 md:py-5 md:px-12'>
        <div>
            <p className='text-sm font-bold'>fipe</p>
            <p className='mt-2 mb-1 text-2xl'>{formatMoney(fipe)}</p>
            <p className='max-w-[150px] text-xs'>Valor deste veículo na Tabela Fipe</p>
        </div>
        <div>
            <p className='text-sm font-bold'>web</p>
            <p className='mt-2 mb-1 text-2xl'>{formatMoney(fipe + fipe * 0.2)}</p>
            <p className='max-w-[150px] text-xs'>Valor médio de venda em toda internet</p>
        </div>
    </div>
)

export default CardValueFipe
