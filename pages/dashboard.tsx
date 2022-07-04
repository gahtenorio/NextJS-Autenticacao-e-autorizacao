import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSHAuth";

export default function Dashboard() {
  const { user, signOut, broadcastAuth} = useContext(AuthContext);

  useEffect(() => {
    api.get("me").then((response) => console.log(response));
  }, []);

  function handleSignOut() {
    broadcastAuth.current.postMessage("signOut");
    signOut();
  }


  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={handleSignOut}>Sign Out</button>

    <Can permissions={['metrics.list']}>
     <div>Métricas</div>
     </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get("/me");
  console.log(response);

  return {
    props: {},
  };
});
