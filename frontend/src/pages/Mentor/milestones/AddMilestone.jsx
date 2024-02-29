import React from 'react'

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
   
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    useDisclosure,
  } from '@chakra-ui/react'

  export const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    )
  })
  
  // 2. Create the form
  export const Form = ({ firstFieldRef, onCancel }) => {
    return (
      <Stack spacing={4}>
        <TextInput
          label='First name'
          id='first-name'
          ref={firstFieldRef}
          defaultValue='John'
        />
        <TextInput label='Last name' id='last-name' defaultValue='Smith' />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button isDisabled colorScheme='teal'>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
  
  // 3. Create the Popover
  // Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
  export const PopoverForm = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const firstFieldRef = React.useRef(null)
  
    return (
      <>
        <Box display='inline-block' mr={3}>
          John Smith
        </Box>
        <Popover
          isOpen={isOpen}
          initialFocusRef={firstFieldRef}
          onOpen={onOpen}
          onClose={onClose}
          placement='right'
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <IconButton size='sm' icon={<EditIcon />} />
          </PopoverTrigger>
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </>
    )
  }

function AddMilestone() {
  return (
    <div>
      render(<PopoverForm />)
    </div>
  )
}

export default AddMilestone
