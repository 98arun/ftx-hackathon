import '../../Assets/Style/style.css'

const GlobalFilter = ({ filter, setFilter }: any) => {
  return (
    <>

      <input
        type="text"
        value={filter || ""}
        className='inputSearch'
        placeholder="Search ...."
        onChange={(e) => setFilter(e.target.value)}
      />

    </>
  );
};

export default GlobalFilter;
