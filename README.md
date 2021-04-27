# reducer excercise



### You can start to solve tasks with a for loop and then refactor by using the Array.reduce method.

## Multiplication

Given a string containing comma-separated numbers, multiply them.

```function multiplyTask(input: string) => number```

```
Input:
    "2,1,4,3"

Output:
    24


Input:
    "2,1,4,3,0,3"

Output:
    0
```

## Parse strings to objects

Given the following key=value formatted string, produce an object containing the same information.

```function parseTask(input: string) => {[k: string]: string} // aka object ```

```
Input:
    "x=09,b=8,c=hello,d=this is d,phone=5553535"

Output:
    {
        "x": "09",
        "b": "8",
        "c": "hello",
        "d": "this is d",
        "phone": "5553535"
    }


Input:
    "x=\"700\", y = 9,z=abc def,g=h"

Output:
    {
        "x": "\"700\"",
        " y ": " 9",
        "z": "abc def",
        "g": "h"
    }
```


## Power metering

Create a state machine that can properly handle the following messages by changing the state.
Treat space as argument separators. Assume that powerplant names cannot contain spaces.

```
    type Citizen = {id: number, credits: number, lignts_on: boolean, powerplant: string}
    type StateType = {monthly_fee: number, citizens: Citizen[]}
    
    function handlePowerMessage(oldState: StateType, message: string) => StateType // new (changed) state
```


State:
```
    const state = {
        monthly_fee: 11,
        citizens: [
            { id: 249, credits: 3, lights_on: true, poweplant: "west" },
            { id: 1412, credits: 3, lights_on: true, poweplant: "south-9" },
            { id: 42, credits: -21, lights_on: true, poweplant: "south-9" },
        ],
    }

```

Messages:

```
    "month_passed"
    "fee_changed 13"
    "add_credits 42 32" // increase credits of user 42 by 32
    "power_failure south-9"
    "power_restored south-9"
    "toggle_lights 42"
    "new_citizen 621"
    "remove_citizen 1412 west"
```


