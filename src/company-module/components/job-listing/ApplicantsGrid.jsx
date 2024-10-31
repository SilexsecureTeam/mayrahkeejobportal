import GridRow from "./GridRow";

const stages = [
  {
    id: 1,
    name: 'in-review',
    border_color: 'border-[#ffb836]'
  },
  {
    id: 2,
    name: 'accepted',
    border_color: 'border-[#4640de]'
  },
  {
    id: 3,
    name: 'rejected',
    border_color: 'border-[#5cbbff]'
  }
];

function ApplicantsGrid({ applicants }) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stages.map(current => (
        <GridRow key={current.id} applicants={applicants} data={current} />
      ))}
    </div>
  );
}

export default ApplicantsGrid;
