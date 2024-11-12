function StatusCard(props) {
  return (
    <div className={`px-2 flex gap-2 font-medium items-center py-1 ${props.color}`}>
      <props.icon size={12} className={props.iconColor} />
      {props.name}
    </div>
  );
}

export default StatusCard;
