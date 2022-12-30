import { gql, useMutation, useQuery } from '@apollo/client';

// 日付を取り出す
const QUERY = gql`
  query date {
    date
  }
`;

// ファイルをアップロードする
const UPLOAD = gql`
  mutation Upload($file: Upload!) {
    upload(file: $file) {
      name
      type
      value
    }
  }
`;

const Page = () => {
  const { data, refetch } = useQuery(QUERY);
  const [upload, { data: file }] = useMutation(UPLOAD);
  return (
    <>
      <a target="_blank" href="https://github.com/SoraKumo001/next-apollo-server" rel="noreferrer">
        Source code
      </a>
      <hr />
      <button onClick={() => refetch()}>日付更新</button>{' '}
      {data?.date && new Date(data.date).toLocaleString('ja-jp', { timeZone: 'Asia/Tokyo' })}
      <div
        style={{
          height: '100px',
          width: '100px',
          background: 'lightgray',
          marginTop: '8px',
          padding: '8px',
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          const file = e.dataTransfer.files[0];
          if (file) {
            upload({ variables: { file } });
          }
          e.preventDefault();
        }}
      >
        Upload Area
      </div>
      {file && <pre>{JSON.stringify(file, undefined, '  ')}</pre>}
    </>
  );
};

export default Page;
