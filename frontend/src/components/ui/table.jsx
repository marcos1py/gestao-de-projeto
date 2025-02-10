export const Table = ({ children }) => (
    <table className="min-w-full border-collapse">{children}</table>
  );
  
  export const TableRow = ({ children }) => (
    <tr className="border-b">{children}</tr>
  );
  
  export const TableCell = ({ children }) => (
    <td className="p-4">{children}</td>
  );
  
  export const TableHead = ({ children }) => (
    <th className="p-4 text-left">{children}</th>
  );
  
  export const TableBody = ({ children }) => (
    <tbody>{children}</tbody>
  );
  
  export const TableHeader = ({ children }) => (
    <thead >{children}</thead>
  );