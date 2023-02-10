import { IoArrowDownOutline, IoArrowUpOutline, IoChevronUpOutline } from 'react-icons/io5'
import ReactECharts from 'echarts-for-react'
import CountUp from 'react-countup'

const HomeDashboard = () => {
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
                <span className='mr-4 text-3xl font-light'>Dashboard</span>
                <span className='text-lg font-light'>Seja bem-vindo, Ibisem!</span>
                <div className='mt-10 grid grid-cols-3 rounded-2xl bg-white py-10 px-16'>
                    <div>
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
                    <div className='justify-self-center'>
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
                    <div className='justify-self-end'>
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
                    <span className='text-2xl font-light'>Atividade Diária</span>
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
                    <span className='text-2xl font-light'>Negociações por região</span>
                    <div className='flex items-center gap-2'>
                        <span>Populares</span>
                        <IoChevronUpOutline />
                    </div>
                </div>
                <div className='mt-10 overflow-hidden rounded-2xl bg-white pt-7'>
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
            </section>
        </div>
    )
}

export default HomeDashboard
