interface ColorPickerDialogProps {
	selectedColor: string;
	onColorChange: (color: string) => void;
	colorOptions: string[];
}
