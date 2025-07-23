// Attendance Service - ApperClient Integration
class AttendanceService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'attendance_c';
    
    // Define updateable fields based on Tables & Fields JSON
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'employee_id_c', 'date_c', 'clock_in_c', 'clock_out_c', 'status_c'
    ];
    
    // Define all fields for fetch operations
    this.allFields = [
      { field: { Name: "Id" } },
      { field: { Name: "Name" } },
      { field: { Name: "Tags" } },
      { field: { Name: "Owner" } },
      { field: { Name: "CreatedOn" } },
      { field: { Name: "CreatedBy" } },
      { field: { Name: "ModifiedOn" } },
      { field: { Name: "ModifiedBy" } },
      { field: { Name: "employee_id_c" } },
      { field: { Name: "date_c" } },
      { field: { Name: "clock_in_c" } },
      { field: { Name: "clock_out_c" } },
      { field: { Name: "status_c" } }
    ];
  }

  // Helper method to filter only updateable fields
filterUpdateableFields(data) {
    const filtered = {};
    this.updateableFields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(data, field) && data[field] !== undefined) {
        // Handle lookup fields - convert to integer if needed
        if (field === 'employee_id_c' && data[field]) {
          filtered[field] = parseInt(data[field]?.Id || data[field]);
        } else {
          filtered[field] = data[field];
        }
      }
    });
    return filtered;
  }

  async getAll() {
    try {
      const params = {
        fields: this.allFields,
        orderBy: [
          {
            fieldName: "date_c",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance records:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: this.allFields
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching attendance record with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(attendanceData) {
    try {
      const filteredData = this.filterUpdateableFields(attendanceData);
      
      const params = {
        records: [filteredData]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create attendance record ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          return null;
        }

        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating attendance record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, attendanceData) {
    try {
      const filteredData = this.filterUpdateableFields(attendanceData);
      filteredData.Id = parseInt(id);
      
      const params = {
        records: [filteredData]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update attendance record ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating attendance record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete attendance record ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          return false;
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting attendance record:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }

  async getByEmployee(employeeId) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            FieldName: "employee_id_c",
            Operator: "EqualTo",
            Values: [parseInt(employeeId)]
          }
        ],
        orderBy: [
          {
            fieldName: "date_c",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByDate(date) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            FieldName: "date_c",
            Operator: "EqualTo",
            Values: [date]
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by date:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByDateRange(startDate, endDate) {
    try {
      const params = {
        fields: this.allFields,
        whereGroups: [
          {
            operator: "AND",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "date_c",
                    operator: "GreaterThanOrEqualTo",
                    values: [startDate],
                    include: true
                  }
                ],
                operator: "AND"
              },
              {
                conditions: [
                  {
                    fieldName: "date_c",
                    operator: "LessThanOrEqualTo",
                    values: [endDate],
                    include: true
                  }
                ],
                operator: "AND"
              }
            ]
          }
        ],
        orderBy: [
          {
            fieldName: "date_c",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by date range:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByStatus(status) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: [status]
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async search(query) {
    try {
      const params = {
        fields: this.allFields,
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              },
              {
                conditions: [
                  {
                    fieldName: "status_c",
                    operator: "Contains",
                    values: [query],
                    include: true
                  }
                ],
                operator: "OR"
              }
            ]
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching attendance records:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async bulkDelete(ids) {
    try {
      const params = {
        RecordIds: ids.map(id => parseInt(id))
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return { deleted: [], failed: ids };
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete attendance records ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }

        return {
          deleted: successfulDeletions.map(result => result.data),
          failed: failedDeletions.map(result => result.id)
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting attendance records:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { deleted: [], failed: ids };
    }
  }

  async getStats() {
    try {
      const params = {
        aggregators: [
          {
            id: "totalRecords",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ]
          },
          {
            id: "presentRecords",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ],
            where: [
              {
                FieldName: "status_c",
                Operator: "EqualTo",
                Values: ["present"]
              }
            ]
          },
          {
            id: "lateRecords",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ],
            where: [
              {
                FieldName: "status_c",
                Operator: "EqualTo",
                Values: ["late"]
              }
            ]
          },
          {
            id: "absentRecords",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ],
            where: [
              {
                FieldName: "status_c",
                Operator: "EqualTo",
                Values: ["absent"]
              }
            ]
          },
          {
            id: "leaveRecords",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ],
            where: [
              {
                FieldName: "status_c",
                Operator: "EqualTo",
                Values: ["leave"]
              }
            ]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return { total: 0, present: 0, late: 0, absent: 0, leave: 0 };
      }

      // Process aggregation results
      let total = 0, present = 0, late = 0, absent = 0, leave = 0;
      
      if (response.aggregators) {
        response.aggregators.forEach(agg => {
          switch (agg.id) {
            case 'totalRecords':
              total = agg.value || 0;
              break;
            case 'presentRecords':
              present = agg.value || 0;
              break;
            case 'lateRecords':
              late = agg.value || 0;
              break;
            case 'absentRecords':
              absent = agg.value || 0;
              break;
            case 'leaveRecords':
              leave = agg.value || 0;
              break;
          }
        });
      }

      return { total, present, late, absent, leave };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching attendance stats:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { total: 0, present: 0, late: 0, absent: 0, leave: 0 };
    }
  }

  async clockIn(employeeId, dateTime) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if record already exists for today
      const existingRecords = await this.getByEmployee(employeeId);
      const todayRecord = existingRecords.find(record => record.date_c === today);
      
      if (todayRecord) {
        // Update existing record with clock-in time
        return await this.update(todayRecord.Id, {
          clock_in_c: dateTime,
          status_c: 'present'
        });
      } else {
        // Create new attendance record
        return await this.create({
          Name: `Attendance - ${today}`,
          employee_id_c: parseInt(employeeId),
          date_c: today,
          clock_in_c: dateTime,
          status_c: 'present'
        });
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error clocking in:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async clockOut(employeeId, dateTime) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Find existing record for today
      const existingRecords = await this.getByEmployee(employeeId);
      const todayRecord = existingRecords.find(record => record.date_c === today);
      
      if (todayRecord) {
        return await this.update(todayRecord.Id, { clock_out_c: dateTime });
      } else {
        throw new Error('No clock-in record found for today');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error clocking out:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}

export default new AttendanceService();