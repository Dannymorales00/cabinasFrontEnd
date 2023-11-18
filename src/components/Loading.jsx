import Spinner from 'react-spinner-material';

const Loading = ({ loading }) => {
  return (
    <>
      {loading ?

        <div className="container">
          <div style={{marginTop:'50vh'}}>
            <Spinner style={{ margin: "auto" }} visible={loading} color="Red" />
          </div>
        </div>
        : null}
    </>
  );
}
export default Loading;