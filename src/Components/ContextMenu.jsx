
function ContextMenu({ menuPosition, setExpenses, setMenuPosition, rowId,expenses, expense,editingRowId, setEditingRowId, setExpense }) {
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          const {title, category, amount} = expenses.find((indiExpense)=> indiExpense.id === rowId)
          setEditingRowId(rowId); 
          setExpense({title, category, amount})
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick = {() => {
          setExpenses((prev) =>(
            prev.filter((expense) => expense.id !== rowId)
          ));
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenu;
