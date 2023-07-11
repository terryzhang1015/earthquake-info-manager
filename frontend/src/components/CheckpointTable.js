export const CheckpointTable = ({canMod, points, onChange}) => {

  const getClosestInfo = async (index) => {
    const response = await fetch('/point/closest/' + points[index].id);
    const body = await response.json();
    let infoData = '';
    if (!body.data) {
      alert("No earthquake close enough");
      return;
    }
    for (const i in body.data)
      infoData += i + ': ' + body.data[i] + '\n';
    alert(infoData);
  }

  const handleDelete = async (index) => {
    const response = await fetch('/point/' + points[index].id, {method: 'DELETE'});
    const body = await response.json();
    if (body.code !== 200) alert('Point Deletion failed: ' + body.code + ' ' + body.msg)
    onChange(index);
  }

  return (
    <>
      <h1>MONITERED CHECKPOINTS</h1>
      <table>
        <thead>
          <tr>
            <th>Lat</th>
            <th>Lon</th>
            <th>Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            points.map((e, index) => (
              <tr key={index}>
                <td>{e.lat}</td>
                <td>{e.lon}</td>
                <td>{e.position ? e.position : (<i>None</i>)}</td>
                <td>
                  <button onClick={() => getClosestInfo(index)}>
                    Get Closest Earthquake
                  </button>
                  {canMod && <button onClick={() => handleDelete(index)}>
                    Delete
                  </button>}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}