import DefaultTemplate from 'components/templates/DefaultTemplate'
import SearchComponent from 'components/organisms/Search'

const Search = () => {
    return (
        <DefaultTemplate title='Pesquisando' hasFooter={false}>
            <SearchComponent />
        </DefaultTemplate>
    )
}

export default Search
