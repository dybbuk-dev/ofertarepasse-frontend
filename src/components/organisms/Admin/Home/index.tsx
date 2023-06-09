import { IoArrowDownOutline, IoArrowUpOutline, IoChevronUpOutline } from 'react-icons/io5'
import ReactECharts from 'echarts-for-react'
import CountUp from 'react-countup'
import { useAuth } from 'hooks/auth'

const HomeDashboard = () => {
    const { user } = useAuth()
    const negotiations = [
        {
            city: 'São Paulo, SP',
            amount: 968,
            negotiations: 460,
            users: 5.229,
        },
        {
            city: 'São Paulo, SP',
            amount: 968,
            negotiations: 460,
            users: 5.229,
        },
        {
            city: 'São Paulo, SP',
            amount: 968,
            negotiations: 460,
            users: 5.229,
        },
        {
            city: 'São Paulo, SP',
            amount: 968,
            negotiations: 460,
            users: 5.229,
        },
        {
            city: 'São Paulo, SP',
            amount: 968,
            negotiations: 460,
            users: 5.229,
        },
    ]

    const options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Inter',
                        fontSize: 16,
                        color: '#17171B',
                    },
                },
                data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
            },
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Inter',
                        fontSize: 16,
                        color: '#17171B',
                    },
                },
            },
        ],
        series: [
            {
                name: 'Usuários Ativos',
                type: 'bar',
                barGap: 1.3,
                itemStyle: {
                    color: '#F3722C',
                },
                emphasis: {
                    focus: 'series',
                },
                data: [425, 332, 301, 334, 390, 900, 300],
                barWidth: 5,
                label: {
                    fontSize: 20,
                },
            },
            {
                name: 'Negociações Concretizadas',
                type: 'bar',
                emphasis: {
                    focus: 'series',
                },
                itemStyle: {
                    color: '#83BF6E',
                },
                data: [220, 182, 191, 234, 290, 500, 500],
                barWidth: 5,
            },
            {
                name: 'Novos Cadastros',
                type: 'bar',
                emphasis: {
                    focus: 'series',
                },
                itemStyle: {
                    color: '#484854',
                },
                data: [150, 232, 201, 154, 190, 600, 250],
                barWidth: 5,
            },
        ],
    }

    return (
        <div>
            <section className='text-gray-200'>
                <div className='flex flex-col text-center md:flex-row md:items-end md:text-left'>
                    <span className='mr-4 text-xl font-light xs:text-2xl md:text-3xl'>
                        Dashboard
                    </span>
                    <span className='text-base font-light md:text-lg'>
                        Seja bem-vindo, {user?.name.split(' ')[0]}!
                    </span>
                </div>
                <div className='mt-2 grid grid-cols-none grid-rows-3 gap-y-4 rounded-2xl bg-white py-2 px-4 xs:mt-5 xs:py-4 xs:px-8 md:mt-10 md:grid-cols-3 md:grid-rows-none md:py-10 md:px-16'>
                    <div className='flex flex-row items-end gap-x-4 md:flex-col md:items-start'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={968} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                28%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>novos anúncios este mês</p>
                    </div>
                    <div className='flex flex-row items-end gap-x-4 md:flex-col md:items-start'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={1268} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-green'>
                                <IoArrowUpOutline />
                                15%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>novos usuários este mês</p>
                    </div>
                    <div className='flex flex-row items-end gap-x-4 md:flex-col md:items-start'>
                        <div className='flex items-center gap-1'>
                            <CountUp start={0} end={688} duration={1}>
                                {({ countUpRef }) => (
                                    <span className='text-6xl font-medium' ref={countUpRef} />
                                )}
                            </CountUp>
                            <div className='flex w-max items-center rounded-full bg-gray-900 px-3 py-1 text-sm text-red-500'>
                                <IoArrowDownOutline />
                                10%
                            </div>
                        </div>
                        <p className='mt-4 text-sm font-medium'>negociações este mês</p>
                    </div>
                </div>
            </section>
            <section className='mt-10'>
                <div className='flex items-center justify-between'>
                    <span className='text-xl font-light md:text-2xl'>Atividade Diária</span>
                    <div className='flex items-center gap-2'>
                        <span>Semanal</span>
                        <IoChevronUpOutline />
                    </div>
                </div>
                <div className='mt-10 rounded-2xl bg-white'>
                    <ReactECharts
                        option={options}
                        lazyUpdate={true}
                        notMerge={true}
                        opts={{ renderer: 'svg' }}
                    />
                </div>
            </section>
            <section className='my-10'>
                <div className='flex items-center justify-between'>
                    <span className='text-xl font-light md:text-2xl'>Negociações por região</span>
                    <div className='flex items-center gap-2'>
                        <span>Populares</span>
                        <IoChevronUpOutline />
                    </div>
                </div>
                <div className='w-full overflow-x-auto bg-transparent'>
                    <div className='mt-10 w-full min-w-[560px] rounded-2xl bg-white pt-7'>
                        <div className='grid grid-cols-4 border-b border-gray-900 px-10 pb-7'>
                            <p>Cidade e Estado</p>
                            <p className='justify-self-center'>Anúncios Ativos</p>
                            <p className='justify-self-center'>Negociações</p>
                            <p className='justify-self-end'>Usuários</p>
                        </div>
                        {negotiations.map((item, index) => (
                            <div
                                key={index}
                                className='grid grid-cols-4 border-b border-gray-900 px-10 py-7 last:border-none'
                            >
                                <p>{item.city}</p>
                                <p className='justify-self-center'>{item.amount} anúncios ativos</p>
                                <p className='justify-self-center text-primary'>
                                    {item.negotiations} negociações
                                </p>
                                <p className='justify-self-end'>{item.users} usuários</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeDashboard
