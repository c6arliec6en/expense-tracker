const mongooes = require('mongoose')
const records = require('./record.json')
const recordSchema = require('../record')

mongooes.connect('mongodb://localhost/record', { useNewUrlParser: true, useCreateIndex: true })

const db = mongooes.connection

db.on('error', () => {
  console.log('db connect err')
})

db.once('open', () => {
  console.log('seeder part db connecting')
  const recordsData = records.results


  for (let i = 0; i < recordsData.length; i++) {
    recordSchema.create({
      name: recordsData[i].name,
      category: recordsData[i].category,
      date: recordsData[i].date,
      amount: recordsData[i].amount,
      userId: recordsData[i].userId
    })
  }
})

