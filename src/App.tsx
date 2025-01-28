import React, { useState } from 'react'

import './App.css'

//Входные данные (пример из задания):

interface IParam {
  id: number
  name: string
  // type?: 'string' | 'number'
}

const params: IParam[] = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  },
]

interface IParamValue {
  paramId: number
  value: string
}

interface IModel {
  paramValues: IParamValue[]
}

const model: IModel = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ]
}

//Тестовое задание выполнено в двух вариантах:

//1. Реализация задания на классовых компонентах
export function App() {
  interface IProps {
    params: IParam[]
    model: IModel
  }

  interface IState {
    model: IModel
  }

  class ParamEditor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)

      this.state = {
        model: props.model
      }
    }

    public getModel(): IModel {
      return this.state.model
    }

    public onModelChange(newModel: IState) {
      this.setState(newModel)
    }

    render() {
      return (
        <div className='container'>
          <p>
            <b>1. Реализация на классовых компонентах</b>
          </p>
          <main className='main'>
            {this.props.params.map((param) => {
              const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const newModel: IState = {
                  model: {
                    ...this.getModel(),
                    paramValues: this.getModel().paramValues.map((el) => (
                      el.paramId === param.id
                        ? { ...el, value: e.target.value }
                        : el
                    ))
                  }
                }
                this.onModelChange(newModel)
              }

              return (
                <div key={param.id} className='content'>
                  <b>{param.name}</b> <input type="text" value={this.getModel().paramValues.find(model => model.paramId === param.id)!.value} onChange={onValueChange} />
                </div>
              )
            })}
          </main>
        </div>
      )
    }
  }

  return <ParamEditor
    params={params}
    model={model}
  />
}

//2. Реализация задания через функциональный подход
export function AppF() {
  interface IProps {
    params: IParam[]
    model: IModel
  }

  function ParamEditor(props: IProps) {
    const [model, setModel] = useState<IModel>(props.model)

    return <div className='container'>
      <p>
        <b>2. Реализация через функциональный подход</b>
      </p>
      <main className='main'>
        {props.params.map((param) => {
          const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newModel: IModel = {
              ...model,
              paramValues: model.paramValues.map((el) => (
                el.paramId === param.id
                  ? { ...el, value: e.target.value }
                  : el
              ))
            }
            setModel(newModel)
          }

          return (
            <div key={param.id} className='content'>
              <b>{param.name}</b> <input type="text" value={model.paramValues.find(model => model.paramId === param.id)!.value} onChange={onValueChange} />
            </div>
          )
        })}
      </main>
    </div>
  }

  return <ParamEditor
    params={params}
    model={model}
  />
}