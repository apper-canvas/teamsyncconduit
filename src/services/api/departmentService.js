import { toast } from "react-toastify";

const departmentService = {
  // Initialize ApperClient
getClient() {
    if (!window.ApperSDK) {
      throw new Error('ApperSDK is not loaded. Please check your internet connection and try again.');
    }
    
    const { ApperClient } = window.ApperSDK;
    if (!ApperClient) {
      throw new Error('ApperClient is not available. Please refresh the page and try again.');
    }
    
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  // Get all departments with pagination and filtering
  async getAll(options = {}) {
    try {
      const apperClient = this.getClient();
      const tableName = 'department_c';
      
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "description_c" } },
          { field: { Name: "head_id_c" } },
          { field: { Name: "member_count_c" } },
          { field: { Name: "date1_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ],
        orderBy: [
          {
            fieldName: "CreatedOn",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: options.limit || 20,
          offset: options.offset || 0
        }
      };

      // Add filtering if provided
      if (options.where) {
        params.where = options.where;
      }

      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
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
  },

  // Get department by ID
  async getById(id) {
    try {
      const apperClient = this.getClient();
      const tableName = 'department_c';
      
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "description_c" } },
          { field: { Name: "head_id_c" } },
          { field: { Name: "member_count_c" } },
          { field: { Name: "date1_c" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "CreatedBy" } },
          { field: { Name: "ModifiedOn" } },
          { field: { Name: "ModifiedBy" } }
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, parseInt(id), params);
      
      if (!response || !response.data) {
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
  },

  // Create new department(s)
  async create(departmentData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'department_c';
      
      // Filter to only include Updateable fields
const updateableFields = {
        Name: departmentData.Name,
        Tags: departmentData.Tags,
        Owner: departmentData.Owner ? parseInt(departmentData.Owner) : undefined,
        description_c: departmentData.description_c,
        head_id_c: departmentData.head_id_c,
        member_count_c: departmentData.member_count_c,
        date1_c: departmentData.date1_c
      };

      // Remove undefined fields
      Object.keys(updateableFields).forEach(key => {
        if (updateableFields[key] === undefined) {
          delete updateableFields[key];
        }
      });
      
      const params = {
        records: [updateableFields]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} department records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Department created successfully');
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Update department(s)
  async update(id, departmentData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'department_c';
      
      // Filter to only include Updateable fields
const updateableFields = {
        Id: parseInt(id),
        Name: departmentData.Name,
        Tags: departmentData.Tags,
        Owner: departmentData.Owner ? parseInt(departmentData.Owner) : undefined,
        description_c: departmentData.description_c,
        head_id_c: departmentData.head_id_c,
        member_count_c: departmentData.member_count_c,
        date1_c: departmentData.date1_c
      };

      // Remove undefined fields (except Id)
      Object.keys(updateableFields).forEach(key => {
        if (key !== 'Id' && updateableFields[key] === undefined) {
          delete updateableFields[key];
        }
      });
      
      const params = {
        records: [updateableFields]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} department records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Department updated successfully');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Delete department(s)
  async delete(recordIds) {
    try {
      const apperClient = this.getClient();
      const tableName = 'department_c';
      
      // Ensure recordIds is an array
      const ids = Array.isArray(recordIds) ? recordIds : [recordIds];
      const integerIds = ids.map(id => parseInt(id));
      
      const params = {
        RecordIds: integerIds
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} department records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success(`${successfulDeletions.length} department(s) deleted successfully`);
        }
        
        return successfulDeletions.length === integerIds.length;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting department:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};

export default departmentService;