import { toast } from "react-toastify";
import React from "react";
import Error from "@/components/ui/Error";

const employeeService = {
  // Initialize ApperClient
  getClient() {
    const { ApperClient } = window.ApperSDK;
    return new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  },

  // Get all employees with pagination and filtering
  async getAll(options = {}) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
          { field: { Name: "number16_c" } },
          { field: { Name: "checkbox1_c" } },
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
        console.error("Error fetching employees:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  // Get employee by ID
  async getById(id) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
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
          { field: { Name: "number16_c" } },
          { field: { Name: "checkbox1_c" } },
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
        console.error(`Error fetching employee with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Create new employee(s)
  async create(employeeData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      // Filter to only include Updateable fields
const updateableFields = {
        Name: employeeData.Name,
        Tags: employeeData.Tags,
        Owner: employeeData.Owner ? parseInt(employeeData.Owner) : undefined,
        first_name_c: employeeData.first_name_c,
        last_name_c: employeeData.last_name_c,
        email_c: employeeData.email_c,
        phone_c: employeeData.phone_c,
        role_c: employeeData.role_c,
        hire_date_c: employeeData.hire_date_c,
        status_c: employeeData.status_c,
        avatar_c: employeeData.avatar_c,
        department_id_c: employeeData.department_id_c ? parseInt(employeeData.department_id_c) : undefined,
        name1_c: employeeData.name1_c,
        name2_c: employeeData.name2_c,
        name3_c: employeeData.name3_c,
        name4_c: employeeData.name4_c,
        name5_c: employeeData.name5_c,
        name6_c: employeeData.name6_c,
        name7_c: employeeData.name7_c,
        name8_c: employeeData.name8_c,
        name9_c: employeeData.name9_c,
        name10_c: employeeData.name10_c,
        name11_c: employeeData.name11_c,
        name12_c: employeeData.name12_c,
        name13_c: employeeData.name13_c,
        name14_c: employeeData.name14_c,
        name15_c: employeeData.name15_c,
        name16_c: employeeData.name16_c,
        name17_c: employeeData.name17_c,
        name18_c: employeeData.name18_c,
        name19_c: employeeData.name19_c,
        name20_c: employeeData.name20_c,
        number1_c: employeeData.number1_c,
        number2_c: employeeData.number2_c,
        number3_c: employeeData.number3_c,
        number4_c: employeeData.number4_c,
        number5_c: employeeData.number5_c,
        number6_c: employeeData.number6_c,
        number7_c: employeeData.number7_c,
        number8_c: employeeData.number8_c,
        number9_c: employeeData.number9_c,
        number10_c: employeeData.number10_c,
        number11_c: employeeData.number11_c,
        number12_c: employeeData.number12_c,
        number13_c: employeeData.number13_c,
        number14_c: employeeData.number14_c,
        number15_c: employeeData.number15_c,
        number16_c: employeeData.number16_c,
        checkbox1_c: employeeData.checkbox1_c,
        date1_c: employeeData.date1_c
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
          console.error(`Failed to create ${failedRecords.length} employee records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulRecords.length > 0) {
          toast.success('Employee created successfully');
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Update employee(s)
  async update(id, employeeData) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
      // Filter to only include Updateable fields
const updateableFields = {
        Id: parseInt(id),
        Name: employeeData.Name,
        Tags: employeeData.Tags,
        Owner: employeeData.Owner ? parseInt(employeeData.Owner) : undefined,
        first_name_c: employeeData.first_name_c,
        last_name_c: employeeData.last_name_c,
        email_c: employeeData.email_c,
        phone_c: employeeData.phone_c,
        role_c: employeeData.role_c,
        hire_date_c: employeeData.hire_date_c,
        status_c: employeeData.status_c,
        avatar_c: employeeData.avatar_c,
        department_id_c: employeeData.department_id_c ? parseInt(employeeData.department_id_c) : undefined,
        name1_c: employeeData.name1_c,
        name2_c: employeeData.name2_c,
        name3_c: employeeData.name3_c,
        name4_c: employeeData.name4_c,
        name5_c: employeeData.name5_c,
        name6_c: employeeData.name6_c,
        name7_c: employeeData.name7_c,
        name8_c: employeeData.name8_c,
        name9_c: employeeData.name9_c,
        name10_c: employeeData.name10_c,
        name11_c: employeeData.name11_c,
        name12_c: employeeData.name12_c,
        name13_c: employeeData.name13_c,
        name14_c: employeeData.name14_c,
        name15_c: employeeData.name15_c,
        name16_c: employeeData.name16_c,
        name17_c: employeeData.name17_c,
        name18_c: employeeData.name18_c,
        name19_c: employeeData.name19_c,
        name20_c: employeeData.name20_c,
        number1_c: employeeData.number1_c,
        number2_c: employeeData.number2_c,
        number3_c: employeeData.number3_c,
        number4_c: employeeData.number4_c,
        number5_c: employeeData.number5_c,
        number6_c: employeeData.number6_c,
        number7_c: employeeData.number7_c,
        number8_c: employeeData.number8_c,
        number9_c: employeeData.number9_c,
        number10_c: employeeData.number10_c,
        number11_c: employeeData.number11_c,
        number12_c: employeeData.number12_c,
        number13_c: employeeData.number13_c,
        number14_c: employeeData.number14_c,
        number15_c: employeeData.number15_c,
        number16_c: employeeData.number16_c,
        checkbox1_c: employeeData.checkbox1_c,
        date1_c: employeeData.date1_c
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
          console.error(`Failed to update ${failedUpdates.length} employee records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          toast.success('Employee updated successfully');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  // Delete employee(s)
  async delete(recordIds) {
    try {
      const apperClient = this.getClient();
      const tableName = 'employee_c';
      
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
          console.error(`Failed to delete ${failedDeletions.length} employee records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulDeletions.length > 0) {
          toast.success(`${successfulDeletions.length} employee(s) deleted successfully`);
        }
        
        return successfulDeletions.length === integerIds.length;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting employee:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  // Search employees
  async search(query) {
    try {
      const searchOptions = {
        where: [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [query]
          }
        ]
      };
      
      return await this.getAll(searchOptions);
    } catch (error) {
      console.error('Error searching employees:', error);
      return [];
    }
  },

  // Get employees by department
  async getByDepartment(departmentId) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "department_id_c",
            Operator: "EqualTo",
            Values: [parseInt(departmentId)]
          }
        ]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching employees by department:', error);
      return [];
    }
  },

  // Get employees by status
  async getByStatus(status) {
    try {
      const filterOptions = {
        where: [
          {
            FieldName: "status_c",
            Operator: "EqualTo",
            Values: [status]
          }
]
      };
      
      return await this.getAll(filterOptions);
    } catch (error) {
      console.error('Error fetching employees by status:', error);
      return [];
    }
  }
};

export default employeeService;