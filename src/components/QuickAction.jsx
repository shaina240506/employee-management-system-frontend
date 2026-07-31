function QuickAction({ title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
flex
items-center
gap-2
px-3
py-1
rounded-full
bg-purple-50
border
border-purple-200
text-[11px]
font-medium4
text-purple-700
whitespace-nowrap
hover:bg-purple-100
hover:border-purple-300
transition-all
duration-200
"
    >
      {title}
    </button>
  );
}

export default QuickAction;
