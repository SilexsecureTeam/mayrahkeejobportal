import GridRow from "./GridRow";


const stages = [
  {
    id: 1,
    name: 'In Review',
    border_color: 'border-[#ffb836]'
  },
  {
    id: 2,
    name: 'Shortlist',
    border_color: 'border-[#4640de]'
  },
  {
    id: 3,
    name: 'Interview',
    border_color: 'border-[#5cbbff]'
  },
  {
    id: 4,
    name: 'In Review',
    border_color: 'border-[#80d9c1]'
  },
]


function ApplicantsGrid() {
  return (
    <div className="w-full  grid grid-cols-4 ">
      {stages.map(current => <GridRow data={current}/>)}
    </div>
  );
}

export default ApplicantsGrid;
