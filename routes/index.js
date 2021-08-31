const express = require('express');
const router = express.Router();
const moment = require('moment');
const { sequelize, Sequelize, Organization, User, WorkShift } = require('../models');
const { Op } = Sequelize;

router.get('/:orgId', async (req, res, next) => {
    const getData = await WorkShift
    .findAll({
      attributes:  [
        'work_shift_name',
        'start_time',
        'end_time',
        'shift_start_date',
        'shift_end_date',
        'organization_id'
    ],
      raw: true,
      include: [
        {
          model: Organization , as: "workshift", 
          include: [
            { model: User, as: "organizations" }
          ]  
        }
      ],
      where: {
        organization_id: {
          [Op.eq]: req.params.orgId,
        },
      },
      order: sequelize.literal("shift_start_date"),
    })
    if (getData && getData.length > 0) {
      res.status(200).send(getData)
    } else {
      res.status(404).send("No data found")
    }
});

/**
 * @async
 * @description To add shifts based on an organisation.
 * @param {Integer} org_id refers to organization id
 * @param {String} shiftName shiftName to be used in request body.
 * @param {String} startDate start date and time used in request body.
 * @param {String} endDate end date and time used in request body.
 */
router.post('/addshift', async (req, res, next) => {
  const { shiftName, startDate, endDate, org_id } = req.body
  if (shiftName && startDate && endDate && org_id) {
    const getshift = await WorkShift.findOne({
      where: {
        organization_id: org_id,
        work_shift_name: shiftName
      }
    })
    if (!getshift) {    
      let sDate = startDate.split(' ')
      let eDate = endDate.split(' ')
      const data = await WorkShift.create({
        work_shift_name: shiftName,
        start_time: sDate[1],
        end_time: eDate[1],
        shift_start_date: moment(sDate[0]).format('YYYY-MM-DD'),
        shift_end_date: moment(eDate[0]).format('YYYY-MM-DD'),
        organization_id: org_id
      })
      if (data){
          res.status(200).send('Shift created successfully')
      } else {
          res.status(500).send('Internal server err')
      }
    } else { console.log("kkk")
      res.send('Shift record exist')
    }
  } else {
    res.status(406).send('Please send valid params')
  }
});

/**
 * @async
 * @description To update shifts.
 * @param {INTEGER} orgId Id of the organization.
 * @param {INTEGER} shiftId Id of the work shift
 * @param {String} shiftName shiftName to be used in request body.
 * @param {String} startDate start date and time used in request body.
 * @param {String} endDate end date and time used in request body.
 */

router.put('/updateshift/:orgId/:shiftId', async (req, res, next) => {
  const { orgId, shiftId } = req.params;
  const { shiftName, startDate, endDate } = req.body
  const getshift = await WorkShift.findOne({
    where: {
      organization_id: orgId,
      id: shiftId
    }
  })
  
  if (shiftName == getshift.work_shift_name) {
    let sDate = startDate.split(' ')
    let eDate = endDate.split(' ')
    const data = await WorkShift.update({    
      start_time: sDate[1],
      end_time: eDate[1],
      shift_start_date: moment(sDate[0]).format('YYYY-MM-DD'),
      shift_end_date: moment(eDate[0]).format('YYYY-MM-DD')
    }, {
      where: {
        organization_id: orgId,
        id: shiftId,
      },
    })
    if (data){
        res.status(200).send('Shift updated successfully')
    } else {
        res.status(500).send('Internal server err')
    }
  } else {
    let sDate = startDate.split(' ')
    let eDate = endDate.split(' ')
    const data = await WorkShift.create({
      work_shift_name: shiftName,
      start_time: sDate[1],
      end_time: eDate[1],
      shift_start_date: moment(sDate[0]).format('YYYY-MM-DD'),
      shift_end_date: moment(eDate[0]).format('YYYY-MM-DD'),
      organization_id: orgId
    })
    if (data){
        res.status(200).send('Shift created successfully')
    } else {
        res.status(500).send('Internal server err')
    }
  }
});

/**
 * @async
 * @description Used to delete a workshift.
 * @param {INTEGER} Id of the workshift to be deleted.
 * @returns {Promise} Result of deletion.
 */

router.delete('/updateshift/:orgId/:shiftId', (req, res, next) => {
  const { orgId, shiftId } = req.params;
  const deldata = WorkShift.destroy({
      where: {
        organization_id: orgId,
        id: shiftId
      }
  })
});

module.exports = router;
