import { TreeItem, TreeView } from "@mui/lab";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { RenderTree } from "./filterNodes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type TreeCheckBoxesProps = {
    nodes: RenderTree;
    setQueryParams: React.Dispatch<React.SetStateAction<string[]>>;
    filters: string[];
    reset: boolean;
    setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

function TreeCheckBoxes({nodes, setQueryParams, filters, reset, setReset}: TreeCheckBoxesProps) {
  const [selected, setSelected] = useState<string[]>(filters);

  useEffect(() => {
    if(reset){
      setSelected([])
      setReset(false);
    } else {
        if(selected.indexOf('Alles') === -1){
          setQueryParams(selected)
        } 
        else {
          setQueryParams([])
        }
      }
  }, [selected, reset, setSelected, setReset, setQueryParams])

  function getChildById(node: RenderTree, id: string) {
    let array: string[] = [];

    function getAllChild(nodes: RenderTree | null) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes: RenderTree, id: string) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked: boolean, nodes: RenderTree) {
    const allNode: string[] = getChildById(nodes, nodes.id);

    let array = checked
      ? [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    setSelected(array)
  }

  const RenderTreeWithCheckboxes = (nodes: RenderTree) => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
              />
            }
            label={<>{nodes.name}</>}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => RenderTreeWithCheckboxes(node))
          : null}
      </TreeItem>
    );
  };
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={["Alles"]}
    >
      {RenderTreeWithCheckboxes(nodes)}
    </TreeView>
  );
}

export default TreeCheckBoxes;
