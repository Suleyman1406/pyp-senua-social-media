import { Avatar } from '@mui/material';

const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Profile</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
        </tr>
        {data.map((item) => (
          <>
           
              <tr key={item.id}>
              <Avatar alt="Cindy Baker" src={item.img}/>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.email}</td>
              </tr>
       
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
