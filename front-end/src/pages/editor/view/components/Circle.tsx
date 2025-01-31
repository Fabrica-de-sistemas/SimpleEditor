interface circleProps {
  size: number; // Tamanho do círculo
  backgroundColor: string; // Cor de fundo do círculo
}

export default function MainTab(props: circleProps) {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: props.backgroundColor,
        width: props.size + "px",
        height: props.size + "px",
        borderRadius: props.size + "px"
      }}
    ></div>
  );
}
