class EmployeeService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'employee_c';
  }

async getAll() {
    try {
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
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
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "hire_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "avatar_c" } },
          { 
            field: { Name: "department_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
{ field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "number1_c" } },
          { field: { Name: "number2_c" } },
          { field: { Name: "number3_c" } },
          { field: { Name: "number4_c" } },
          { field: { Name: "number5_c" } },
          { field: { Name: "number6_c" } },
          { field: { Name: "number7_c" } },
          { field: { Name: "number8_c" } },
          { field: { Name: "number9_c" } },
          { field: { Name: "number10_c" } },
          { field: { Name: "number11_c" } },
          { field: { Name: "number12_c" } },
          { field: { Name: "number13_c" } },
          { field: { Name: "number14_c" } },
          { field: { Name: "number15_c" } },
          { field: { Name: "number16_c" } }
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
        console.error("Error fetching employees:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching employees:", error.message);
        throw new Error(error.message);
      }
    }
  }

async getById(id) {
    try {
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
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
          { field: { Name: "email_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "role_c" } },
          { field: { Name: "hire_date_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "avatar_c" } },
          { 
            field: { Name: "department_id_c" },
            referenceField: { field: { Name: "Name" } }
          },
{ field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "number1_c" } },
          { field: { Name: "number2_c" } },
          { field: { Name: "number3_c" } },
          { field: { Name: "number4_c" } },
          { field: { Name: "number5_c" } },
          { field: { Name: "number6_c" } },
          { field: { Name: "number7_c" } },
          { field: { Name: "number8_c" } },
          { field: { Name: "number9_c" } },
          { field: { Name: "number10_c" } },
          { field: { Name: "number11_c" } },
          { field: { Name: "number12_c" } },
          { field: { Name: "number13_c" } },
          { field: { Name: "number14_c" } },
          { field: { Name: "number15_c" } },
          { field: { Name: "number16_c" } }
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
        console.error(`Error fetching employee with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(`Error fetching employee with ID ${id}:`, error.message);
        throw new Error(error.message);
      }
    }
  }

async create(employeeData) {
    try {
      const params = {
        records: [{
          Name: employeeData.Name || `${employeeData.first_name_c} ${employeeData.last_name_c}`,
          first_name_c: employeeData.first_name_c,
          last_name_c: employeeData.last_name_c,
          name1_c: parseInt(employeeData.name1_c) || 0,
          name2_c: Boolean(employeeData.name2_c),
          name3_c: parseFloat(employeeData.name3_c) || 0,
          name4_c: employeeData.name4_c || "",
          name5_c: employeeData.name5_c || "",
          name6_c: parseFloat(employeeData.name6_c) || 0,
          name7_c: employeeData.name7_c || "",
          name8_c: Array.isArray(employeeData.name8_c) ? employeeData.name8_c.join(',') : employeeData.name8_c || "",
          name9_c: employeeData.name9_c || "",
          name10_c: employeeData.name10_c || "",
          name11_c: employeeData.name11_c || "",
          name12_c: employeeData.name12_c || "",
          name13_c: Array.isArray(employeeData.name13_c) ? employeeData.name13_c.join(',') : employeeData.name13_c || "",
          name14_c: employeeData.name14_c || "",
          name15_c: parseInt(employeeData.name15_c) || 0,
          name16_c: employeeData.name16_c || "",
          name17_c: Array.isArray(employeeData.name17_c) ? employeeData.name17_c.join(',') : employeeData.name17_c || "",
          name18_c: Array.isArray(employeeData.name18_c) ? employeeData.name18_c.join(',') : employeeData.name18_c || "",
          name19_c: Array.isArray(employeeData.name19_c) ? employeeData.name19_c.join(',') : employeeData.name19_c || "",
          name20_c: employeeData.name20_c || "",
          email_c: employeeData.email_c,
          phone_c: employeeData.phone_c,
          role_c: employeeData.role_c,
          hire_date_c: employeeData.hire_date_c,
          status_c: employeeData.status_c,
          avatar_c: employeeData.avatar_c || "",
          department_id_c: parseInt(employeeData.department_id_c) || null,
          Tags: employeeData.Tags || "",
          Owner: employeeData.Owner,
number1_c: employeeData.number1_c || "",
          number2_c: parseInt(employeeData.number2_c) || 0,
          number3_c: parseInt(employeeData.number3_c) || 0,
          number4_c: parseInt(employeeData.number4_c) || 0,
          number5_c: parseInt(employeeData.number5_c) || 0,
          number6_c: parseInt(employeeData.number6_c) || 0,
          number7_c: parseInt(employeeData.number7_c) || 0,
          number8_c: parseInt(employeeData.number8_c) || 0,
          number9_c: parseInt(employeeData.number9_c) || 0,
          number10_c: parseInt(employeeData.number10_c) || 0,
          number11_c: parseInt(employeeData.number11_c) || 0,
          number12_c: parseInt(employeeData.number12_c) || 0,
          number13_c: parseInt(employeeData.number13_c) || 0,
          number14_c: parseInt(employeeData.number14_c) || 0,
          number15_c: parseInt(employeeData.number15_c) || 0,
          number16_c: parseInt(employeeData.number16_c) || 0
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
          throw new Error(failedRecords[0].message || "Failed to create employee");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating employee:", error.message);
        throw new Error(error.message);
      }
    }
  }

async update(id, employeeData) {
    try {
      const params = {
        records: [{
          Id: id,
          Name: employeeData.Name || `${employeeData.first_name_c} ${employeeData.last_name_c}`,
          first_name_c: employeeData.first_name_c,
          last_name_c: employeeData.last_name_c,
          name1_c: parseInt(employeeData.name1_c) || 0,
          name2_c: Boolean(employeeData.name2_c),
          name3_c: parseFloat(employeeData.name3_c) || 0,
          name4_c: employeeData.name4_c || "",
          name5_c: employeeData.name5_c || "",
          name6_c: parseFloat(employeeData.name6_c) || 0,
          name7_c: employeeData.name7_c || "",
          name8_c: Array.isArray(employeeData.name8_c) ? employeeData.name8_c.join(',') : employeeData.name8_c || "",
          name9_c: employeeData.name9_c || "",
          name10_c: employeeData.name10_c || "",
          name11_c: employeeData.name11_c || "",
          name12_c: employeeData.name12_c || "",
          name13_c: Array.isArray(employeeData.name13_c) ? employeeData.name13_c.join(',') : employeeData.name13_c || "",
          name14_c: employeeData.name14_c || "",
          name15_c: parseInt(employeeData.name15_c) || 0,
          name16_c: employeeData.name16_c || "",
          name17_c: Array.isArray(employeeData.name17_c) ? employeeData.name17_c.join(',') : employeeData.name17_c || "",
          name18_c: Array.isArray(employeeData.name18_c) ? employeeData.name18_c.join(',') : employeeData.name18_c || "",
          name19_c: Array.isArray(employeeData.name19_c) ? employeeData.name19_c.join(',') : employeeData.name19_c || "",
          name20_c: employeeData.name20_c || "",
          email_c: employeeData.email_c,
          phone_c: employeeData.phone_c,
          role_c: employeeData.role_c,
          hire_date_c: employeeData.hire_date_c,
          status_c: employeeData.status_c,
          avatar_c: employeeData.avatar_c,
          department_id_c: parseInt(employeeData.department_id_c) || null,
          Tags: employeeData.Tags,
          Owner: employeeData.Owner,
number1_c: employeeData.number1_c || "",
          number2_c: parseInt(employeeData.number2_c) || 0,
          number3_c: parseInt(employeeData.number3_c) || 0,
          number4_c: parseInt(employeeData.number4_c) || 0,
          number5_c: parseInt(employeeData.number5_c) || 0,
          number6_c: parseInt(employeeData.number6_c) || 0,
          number7_c: parseInt(employeeData.number7_c) || 0,
          number8_c: parseInt(employeeData.number8_c) || 0,
          number9_c: parseInt(employeeData.number9_c) || 0,
          number10_c: parseInt(employeeData.number10_c) || 0,
          number11_c: parseInt(employeeData.number11_c) || 0,
          number12_c: parseInt(employeeData.number12_c) || 0,
          number13_c: parseInt(employeeData.number13_c) || 0,
          number14_c: parseInt(employeeData.number14_c) || 0,
          number15_c: parseInt(employeeData.number15_c) || 0,
          number16_c: parseInt(employeeData.number16_c) || 0
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
          throw new Error(failedUpdates[0].message || "Failed to update employee");
        }
        
        return successfulUpdates[0]?.data;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating employee:", error.message);
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
          throw new Error(failedDeletions[0].message || "Failed to delete employee");
        }
        
        return { success: true };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting employee:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

export const employeeService = new EmployeeService();