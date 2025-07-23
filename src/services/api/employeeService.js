// Employee Service - ApperClient Integration
class EmployeeService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'employee_c';
    
    // Define updateable fields based on Tables & Fields JSON
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'first_name_c', 'last_name_c', 'email_c', 
      'phone_c', 'role_c', 'hire_date_c', 'status_c', 'avatar_c', 'department_id_c',
      'name1_c', 'name2_c', 'name3_c', 'name4_c', 'name5_c', 'name6_c', 'name7_c',
      'name8_c', 'name9_c', 'name10_c', 'name11_c', 'name12_c', 'name13_c', 'name14_c',
      'name15_c', 'name16_c', 'name17_c', 'name18_c', 'name19_c', 'name20_c', 'checkbox1_c',
      'date1_c', 'boolean1_c', 'boolean2_c', 'decimal1_c', 'decimal2_c', 'multilinetext1_c',
      'autonumber1_c', 'sample1_c', 'sample2_c', 'autonumber2_c', 'autonumber3_c',
      'autonumber4_c', 'autonumber5_c'
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
      { field: { Name: "first_name_c" } },
      { field: { Name: "last_name_c" } },
      { field: { Name: "email_c" } },
      { field: { Name: "phone_c" } },
      { field: { Name: "role_c" } },
      { field: { Name: "hire_date_c" } },
      { field: { Name: "status_c" } },
      { field: { Name: "avatar_c" } },
      { field: { Name: "department_id_c" } },
      { field: { Name: "name1_c" } },
      { field: { Name: "name2_c" } },
      { field: { Name: "name3_c" } },
      { field: { Name: "name4_c" } },
      { field: { Name: "name5_c" } },
      { field: { Name: "name6_c" } },
      { field: { Name: "name7_c" } },
      { field: { Name: "name8_c" } },
      { field: { Name: "name9_c" } },
      { field: { Name: "name10_c" } },
      { field: { Name: "name11_c" } },
      { field: { Name: "name12_c" } },
      { field: { Name: "name13_c" } },
      { field: { Name: "name14_c" } },
      { field: { Name: "name15_c" } },
      { field: { Name: "name16_c" } },
      { field: { Name: "name17_c" } },
      { field: { Name: "name18_c" } },
      { field: { Name: "name19_c" } },
      { field: { Name: "name20_c" } },
      { field: { Name: "checkbox1_c" } },
      { field: { Name: "date1_c" } },
      { field: { Name: "boolean1_c" } },
      { field: { Name: "boolean2_c" } },
      { field: { Name: "decimal1_c" } },
      { field: { Name: "decimal2_c" } },
      { field: { Name: "multilinetext1_c" } },
      { field: { Name: "autonumber1_c" } },
      { field: { Name: "sample1_c" } },
      { field: { Name: "sample2_c" } },
      { field: { Name: "autonumber2_c" } },
      { field: { Name: "autonumber3_c" } },
      { field: { Name: "autonumber4_c" } },
      { field: { Name: "autonumber5_c" } }
    ];
  }

  // Helper method to filter only updateable fields
  filterUpdateableFields(data) {
    const filtered = {};
    this.updateableFields.forEach(field => {
      if (data.hasOwnProperty(field) && data[field] !== undefined) {
        // Handle lookup fields - convert to integer if needed
        if (field === 'department_id_c' && data[field]) {
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
            fieldName: "Id",
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
        console.error("Error fetching employees:", error?.response?.data?.message);
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
        console.error(`Error fetching employee with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(employeeData) {
    try {
      const filteredData = this.filterUpdateableFields(employeeData);
      
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
          console.error(`Failed to create employee ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          return null;
        }

        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, employeeData) {
    try {
      const filteredData = this.filterUpdateableFields(employeeData);
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
          console.error(`Failed to update employee ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message);
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
          console.error(`Failed to delete employee ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          return false;
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
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
          console.error(`Failed to delete employees ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }

        return {
          deleted: successfulDeletions.map(result => result.data),
          failed: failedDeletions.map(result => result.id)
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { deleted: [], failed: ids };
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
                    fieldName: "first_name_c",
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
                    fieldName: "last_name_c",
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
                    fieldName: "email_c",
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
                    fieldName: "role_c",
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
        console.error("Error searching employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getByDepartment(departmentId) {
    try {
      const params = {
        fields: this.allFields,
        where: [
          {
            FieldName: "department_id_c",
            Operator: "EqualTo",
            Values: [parseInt(departmentId)]
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
        console.error("Error fetching employees by department:", error?.response?.data?.message);
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
        console.error("Error fetching employees by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async updateStatus(id, status) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            status_c: status
          }
        ]
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
          console.error(`Failed to update employee status ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async getStats() {
    try {
      const params = {
        aggregators: [
          {
            id: "totalEmployees",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ]
          },
          {
            id: "activeEmployees",
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
                Values: ["active"]
              }
            ]
          },
          {
            id: "inactiveEmployees",
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
                Values: ["inactive"]
              }
            ]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return { total: 0, active: 0, inactive: 0 };
      }

      // Process aggregation results
      let total = 0, active = 0, inactive = 0;
      
      if (response.aggregators) {
        response.aggregators.forEach(agg => {
          switch (agg.id) {
            case 'totalEmployees':
              total = agg.value || 0;
              break;
            case 'activeEmployees':
              active = agg.value || 0;
              break;
            case 'inactiveEmployees':
              inactive = agg.value || 0;
              break;
          }
        });
      }

      return { total, active, inactive };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching employee stats:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { total: 0, active: 0, inactive: 0 };
    }
  }

  async bulkUpdate(updates) {
    try {
      const records = updates.map(update => {
        const filteredData = this.filterUpdateableFields(update.data);
        return {
          Id: parseInt(update.Id),
          ...filteredData
        };
      });

      const params = { records };

      const response = await this.apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      if (response.results) {
        const results = response.results.map(result => ({
          success: result.success,
          data: result.success ? result.data : null,
          error: result.success ? null : result.message,
          id: result.success ? result.data?.Id : null
        }));

        const failedUpdates = results.filter(result => !result.success);
        if (failedUpdates.length > 0) {
          console.error(`Failed to bulk update employees ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }

        return results;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk updating employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
}

export default new EmployeeService();