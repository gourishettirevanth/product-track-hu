export default function ErrorTable({ errors }) {
  return (
    <div>
      <h3>Top Errors</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Error ID</th>
            <th>Description</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {errors.map((err, i) => (
            <tr key={i}>
              <td>{err.id}</td>
              <td>{err.message}</td>
              <td>{err.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}