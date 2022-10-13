import express from 'express'
import mongoose from 'mongoose'
const app = express()
import FoodModel from './models/Food.js'
import cors from 'cors'

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://naves:naves@cluster0.4pmirgx.mongodb.net/Naves?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

app.get('/read', async (req, res) => {
  FoodModel.find({}, (error, result) => {
    if(error) {
      return res.send(error)
    }
    res.send(result)
  })
})

app.post('/insert', async (req, res) => {

  const food = req.body.food
  const days = req.body.days

  const foodModel = new FoodModel({ foodName: food, daysSinceIAte: days })

  try {
    await foodModel.save()
  } catch (error) {
    console.log(error)
  }

  return res.sendStatus(200)
})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await FoodModel.findByIdAndDelete(id)
  res.sendStatus(200)
})

app.put('/edit', async (req, res) => {
  const id = req.body.id
  const foodEdited = req.body.food
  const daysEdited = req.body.days
  console.log(id, foodEdited, daysEdited)

  await FoodModel.findByIdAndUpdate(id, { foodName: foodEdited, daysSinceIAte: daysEdited })
  res.sendStatus(200)
})

app.listen(5000, () => {
  console.log('Server is Ready!')
})