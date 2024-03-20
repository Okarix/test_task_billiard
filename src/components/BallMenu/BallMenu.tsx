const BallMenu: React.FC<ColorPickerDialogProps> = ({ selectedColor, onColorChange, colorOptions }) => {
	return (
		<div className='ball_menu'>
			<label>Select color: </label>
			<select
				value={selectedColor}
				onChange={e => onColorChange(e.target.value)}
			>
				{colorOptions.map((color, index) => (
					<option
						key={index}
						value={color}
					>
						{color}
					</option>
				))}
			</select>
		</div>
	);
};

export default BallMenu;
