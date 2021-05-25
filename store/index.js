import { unmarshall } from '@aws-sdk/util-dynamodb'

export const state = () => ({
  showBackIcon: false,
  hospitalList: [],
  backToLink: null,
  upTime: null,
})

export const mutations = {
  updateHospitals(state, { hospitals, upTime }) {
    state.hospitalList = hospitals
    state.upTime = upTime
  },
  setBackLink(state, link) {
    if (link !== undefined && link !== null && link !== '') {
      state.backToLink = link
      state.showBackIcon = true
    } else {
      state.backToLink = null
      state.showBackIcon = false
    }
  },
}

export const actions = {
  async fetchHospitals({ commit }) {
    const self = this
    await getHospitals(self, 'tn_hospital_all', [], null, commit)
  },
  setBackLink({ commit }, link) {
    commit('setBackLink', link)
  },
}

const getHospitals = async function (self, tableName, data, startKey, commit) {
  const config = { TableName: tableName }
  if (startKey !== undefined && startKey !== null) {
    config.ExclusiveStartKey = startKey
  }
  await self.$dbClient.scan(config, async function (err, dbdata) {
    if (err) {
      console.log(err)
      return data
    } else {
      data = data.concat(dbdata.Items)
      if (
        dbdata.LastEvaluatedKey !== undefined &&
        dbdata.LastEvaluatedKey !== null
      ) {
        const rdata = await getHospitals(
          self,
          tableName,
          data,
          dbdata.LastEvaluatedKey,
          commit
        )
        return rdata
      } else {
        let hospitals = []
        let upTime = null
        data.forEach((element) => {
          const item = unmarshall(element)
          hospitals = hospitals.concat(item.data)
          upTime = item.updateTime
        })
        commit('updateHospitals', { hospitals, upTime })
      }
    }
  })
}
