interface ITableProps {
  thElements: string[] | React.ReactNode[];
  children: React.ReactNode;
}

interface ITableItemProps {
  content: string | React.ReactNode;
  center?: boolean;
}

export const TableRow = ({ children }: ISlotBasic) => (
  <tr className="px-4 py-2 hover:-translate-y-1 transition-all duration-500">{children}</tr>
);
export const TableItem = ({ content, center = false }: ITableItemProps) => <td className={`py-4 border-b pl-2 ${center ? "text-center" : " "}`}>{content}</td>;

function Table({ thElements, children }: ITableProps) {
  return (
    <table className="table-fixed border-separate border-spacing-y-2 w-full ">
      <thead className="uppercase text-xs text-primaryLight">
        <tr>
          {thElements.map((el, index) => (
            <th key={`${el}__${index}`} className={`text-left ${index === thElements.length - 1 ? "text-center" : "pl-4"}`}>
              {el}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

Table.Row = TableRow;
Table.Item = TableItem;

export default Table;
