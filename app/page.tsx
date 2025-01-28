import axios from "axios"

const Home = async () => {
  const { data } = await axios.get('https://randomuser.me/api/?page=1&results=2&seed=abc');
  console.log(data);
  return (
    <>
      {data.results.map((user: any) => (
        <div key={user.login.uuid}>
          <img src={user.picture.large} alt={user.name.first} />
          <p>{user.name.first} {user.name.last}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </>
  )
}
export default Home
