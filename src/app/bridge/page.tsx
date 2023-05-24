import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from "../components/ui/select";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="m-auto border w-60 rounded-lg">
        <Select>
          <SelectTrigger />
          <SelectContent className="w-full h-32">
            <SelectItem value="test">test</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
