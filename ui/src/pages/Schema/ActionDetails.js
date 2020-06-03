import {ActionGroup, Button, Form, FormGroup, SelectOption, Switch, TextInput} from '@patternfly/react-core';

import React from 'react';
import ConfirmDelete from "../../components/ConfirmDelete";
import BetterSelect from "../../components/BetterSelect";
import {clone, fieldSetters, toKeyedArray} from "../../utils";
import Mount from "./Mount";
import Rename from "./Rename";
import Remove from "./Remove";
import Link from "./Link";

const ActionDetails = ({config, onClose, actions, setActions, id}) => {

  const [action, setAction] = React.useState(actions[id]);
  const onChange = fieldSetters(action, setAction)

  const onSave = () => {
    const v = clone(actions)
    v[id] = action
    setActions(v)
    onClose()
  }

  const deleteDialog = ConfirmDelete((confirmed) => {
    if (confirmed) {
      const v = clone(actions)
      v.splice(id, 1);
      setActions(v)
      onClose()
    }
  })
  const upstreams = toKeyedArray(config.upstreams)

  return <Form>
    <FormGroup label="Type" isRequired fieldId="type" helperText="The type of action">
      <BetterSelect value={action.type} setValue={onChange.type}>
        <SelectOption value="mount">Mount</SelectOption>
        <SelectOption value="link">Link</SelectOption>
        <SelectOption value="rename">Rename</SelectOption>
        <SelectOption value="remove">Remove</SelectOption>
      </BetterSelect>
    </FormGroup>
    {action.type === "mount" && <Mount upstreams={upstreams} action={action} setAction={setAction}/>}
    {action.type === "link" && <Link upstreams={upstreams} action={action} setAction={setAction}/>}
    {action.type === "rename" && <Rename action={action} setAction={setAction}/>}
    {action.type === "remove" && <Remove action={action} setAction={setAction}/>}
    <ActionGroup>
      <Button variant="primary" onClick={onSave}>Save</Button>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="secondary" onClick={deleteDialog.open}>Delete</Button>
      {deleteDialog.render()}
    </ActionGroup>
  </Form>
}

export default ActionDetails