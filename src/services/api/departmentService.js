class DepartmentService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'department_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "head_id_c" } },
          { field: { Name: "member_count_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching departments:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching departments:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description_c" } },
          { field: { Name: "head_id_c" } },
          { field: { Name: "member_count_c" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching department with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching department with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(departmentData) {
    try {
      const params = {
        records: [{
          Name: departmentData.Name,
          description_c: departmentData.description_c,
          head_id_c: departmentData.head_id_c,
          member_count_c: departmentData.member_count_c || 0,
          Tags: departmentData.Tags || "",
          Owner: departmentData.Owner
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error(failedRecords[0].message || "Failed to create department");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating department:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating department:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, departmentData) {
    try {
      const params = {
        records: [{
          Id: id,
          Name: departmentData.Name,
          description_c: departmentData.description_c,
          head_id_c: departmentData.head_id_c,
          member_count_c: departmentData.member_count_c,
          Tags: departmentData.Tags,
          Owner: departmentData.Owner
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          throw new Error(failedUpdates[0].message || "Failed to update department");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating department:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating department:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          throw new Error(failedDeletions[0].message || "Failed to delete department");
        }
        
        return { success: true };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting department:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting department:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export const departmentService = new DepartmentService();