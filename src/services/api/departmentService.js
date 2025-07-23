// Department Service - ApperClient Integration
class DepartmentService {
  constructor() {
    // Initialize ApperClient with Project ID and Public Key
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'department_c';
    
    // Define updateable fields based on Tables & Fields JSON
    this.updateableFields = [
      'Name', 'Tags', 'Owner', 'description_c', 'head_id_c', 'member_count_c', 'date1_c'
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
      { field: { Name: "description_c" } },
      { field: { Name: "head_id_c" } },
      { field: { Name: "member_count_c" } },
      { field: { Name: "date1_c" } }
    ];
  }

  // Helper method to filter only updateable fields
filterUpdateableFields(data) {
    const filtered = {};
    this.updateableFields.forEach(field => {
      if (Object.prototype.hasOwnProperty.call(data, field) && data[field] !== undefined) {
        filtered[field] = data[field];
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
        console.error("Error fetching departments:", error?.response?.data?.message);
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
        console.error(`Error fetching department with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async create(departmentData) {
    try {
      const filteredData = this.filterUpdateableFields(departmentData);
      
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
          console.error(`Failed to create department ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          return null;
        }

        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  async update(id, departmentData) {
    try {
      const filteredData = this.filterUpdateableFields(departmentData);
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
          console.error(`Failed to update department ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating department:", error?.response?.data?.message);
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
          console.error(`Failed to delete department ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          return false;
        }

        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
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
                    fieldName: "description_c",
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
        console.error("Error searching departments:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  async getStats() {
    try {
      const params = {
        aggregators: [
          {
            id: "totalDepartments",
            fields: [
              {
                field: { Name: "Id" },
                Function: "Count"
              }
            ]
          },
          {
            id: "totalMembers",
            fields: [
              {
                field: { Name: "member_count_c" },
                Function: "Sum"
              }
            ]
          },
          {
            id: "avgMembers",
            fields: [
              {
                field: { Name: "member_count_c" },
                Function: "Average"
              }
            ]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error(response.message);
        return { total: 0, totalMembers: 0, avgMembers: 0 };
      }

      // Process aggregation results
      let total = 0, totalMembers = 0, avgMembers = 0;
      
      if (response.aggregators) {
        response.aggregators.forEach(agg => {
          switch (agg.id) {
            case 'totalDepartments':
              total = agg.value || 0;
              break;
            case 'totalMembers':
              totalMembers = agg.value || 0;
              break;
            case 'avgMembers':
              avgMembers = Math.round(agg.value || 0);
              break;
          }
        });
      }

      return { total, totalMembers, avgMembers };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching department stats:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { total: 0, totalMembers: 0, avgMembers: 0 };
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
          console.error(`Failed to delete departments ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }

        return {
          deleted: successfulDeletions.map(result => result.data),
          failed: failedDeletions.map(result => result.id)
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting departments:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return { deleted: [], failed: ids };
    }
  }

  async updateMemberCount(id, count) {
    try {
      const params = {
        records: [
          {
            Id: parseInt(id),
            member_count_c: parseInt(count)
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
          console.error(`Failed to update department member count ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          return null;
        }

        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating department member count:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}

export default new DepartmentService();