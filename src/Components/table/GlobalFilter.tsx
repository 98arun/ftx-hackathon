
const GlobalFilter = ({ filter, setFilter }: any) => {
    return (
        <>
            <input type="text" value={filter || ''} placeholder='Search ....'
                onChange={e => setFilter(e.target.value)} />
        </>
    )
}

export default GlobalFilter
